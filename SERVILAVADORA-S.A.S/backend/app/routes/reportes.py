# app/routes/reportes.py
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, and_, extract
from typing import Optional
from datetime import date, datetime, timedelta
from decimal import Decimal
from app.core.security import get_db, get_current_user
from app.models.models import (
    Agendamiento, Factura, Pago, Servicio, 
    HistorialServicio, Usuario, EstadoAgendamiento,
    EstadoFactura, EstadoPago
)
from app.schemas.schemas import ReporteAgendamientos, ReporteIngresos

router = APIRouter(prefix="/reportes", tags=["Reportes"])

# ============= REPORTE DE AGENDAMIENTOS =============
@router.get("/agendamientos", response_model=ReporteAgendamientos)
def reporte_agendamientos(
    fecha_desde: Optional[date] = None,
    fecha_hasta: Optional[date] = None,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """
    Genera reporte de agendamientos
    Algoritmo: Agrupa por estado y servicio, calcula ingresos estimados
    """
    query = db.query(Agendamiento)
    
    # Aplicar filtros de fecha
    if fecha_desde:
        query = query.filter(Agendamiento.fecha >= fecha_desde)
    if fecha_hasta:
        query = query.filter(Agendamiento.fecha <= fecha_hasta)
    
    agendamientos = query.all()
    
    # Total de agendamientos
    total = len(agendamientos)
    
    # Agrupación por estado
    por_estado = {}
    for estado in EstadoAgendamiento:
        cantidad = len([a for a in agendamientos if a.estado == estado])
        por_estado[estado.value] = cantidad
    
    # Agrupación por servicio con ingresos
    servicios_dict = {}
    ingresos_estimados = Decimal(0)
    
    for agendamiento in agendamientos:
        servicio = db.query(Servicio).filter(
            Servicio.id_servicio == agendamiento.servicio_id
        ).first()
        
        if servicio:
            if servicio.id_servicio not in servicios_dict:
                servicios_dict[servicio.id_servicio] = {
                    "servicio_id": servicio.id_servicio,
                    "nombre_servicio": servicio.nombre_servicio,
                    "cantidad": 0,
                    "ingresos_estimados": Decimal(0)
                }
            
            servicios_dict[servicio.id_servicio]["cantidad"] += 1
            
            # Solo contar ingresos si no está cancelado
            if agendamiento.estado != EstadoAgendamiento.CANCELADO:
                servicios_dict[servicio.id_servicio]["ingresos_estimados"] += servicio.precio_base
                ingresos_estimados += servicio.precio_base
    
    por_servicio = list(servicios_dict.values())
    
    return {
        "total_agendamientos": total,
        "por_estado": por_estado,
        "por_servicio": por_servicio,
        "ingresos_estimados": ingresos_estimados
    }

# ============= REPORTE DE INGRESOS =============
@router.get("/ingresos", response_model=ReporteIngresos)
def reporte_ingresos(
    fecha_desde: Optional[date] = None,
    fecha_hasta: Optional[date] = None,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """
    Genera reporte de ingresos y facturación
    Algoritmo: Suma totales por forma de pago y estado
    """
    query = db.query(Factura)
    
    # Filtros de fecha
    if fecha_desde:
        query = query.filter(func.date(Factura.fecha) >= fecha_desde)
    if fecha_hasta:
        query = query.filter(func.date(Factura.fecha) <= fecha_hasta)
    
    facturas = query.all()
    
    # Calcular totales
    total_ingresos = Decimal(0)
    total_facturas = len(facturas)
    facturas_pagadas = 0
    facturas_pendientes = 0
    
    for factura in facturas:
        if factura.estado == EstadoFactura.PAGADA:
            total_ingresos += factura.total
            facturas_pagadas += 1
        elif factura.estado == EstadoFactura.EMITIDA:
            facturas_pendientes += 1
    
    # Agrupación por forma de pago
    formas_pago_dict = {}
    
    for factura in facturas:
        if factura.estado == EstadoFactura.PAGADA and factura.forma_pago:
            fp_id = factura.forma_pago.id_forma_pago
            
            if fp_id not in formas_pago_dict:
                formas_pago_dict[fp_id] = {
                    "forma_pago": factura.forma_pago.nombre_forma,
                    "cantidad": 0,
                    "total": Decimal(0)
                }
            
            formas_pago_dict[fp_id]["cantidad"] += 1
            formas_pago_dict[fp_id]["total"] += factura.total
    
    por_forma_pago = list(formas_pago_dict.values())
    
    # Determinar periodo
    periodo = f"{fecha_desde or 'inicio'} - {fecha_hasta or 'hoy'}"
    
    return {
        "periodo": periodo,
        "total_ingresos": total_ingresos,
        "total_facturas": total_facturas,
        "facturas_pagadas": facturas_pagadas,
        "facturas_pendientes": facturas_pendientes,
        "por_forma_pago": por_forma_pago
    }

# ============= REPORTE MENSUAL =============
@router.get("/mensual/{año}/{mes}")
def reporte_mensual(
    año: int,
    mes: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Genera reporte completo de un mes específico"""
    
    # Validar mes
    if mes < 1 or mes > 12:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Mes inválido"
        )
    
    # Calcular fechas del mes
    primer_dia = date(año, mes, 1)
    if mes == 12:
        ultimo_dia = date(año + 1, 1, 1) - timedelta(days=1)
    else:
        ultimo_dia = date(año, mes + 1, 1) - timedelta(days=1)
    
    # Agendamientos del mes
    agendamientos = db.query(Agendamiento).filter(
        and_(
            Agendamiento.fecha >= primer_dia,
            Agendamiento.fecha <= ultimo_dia
        )
    ).all()
    
    # Facturas del mes
    facturas = db.query(Factura).filter(
        and_(
            func.date(Factura.fecha) >= primer_dia,
            func.date(Factura.fecha) <= ultimo_dia
        )
    ).all()
    
    # Calcular métricas
    total_agendamientos = len(agendamientos)
    agendamientos_completados = len([a for a in agendamientos if a.estado == EstadoAgendamiento.FINALIZADO])
    
    total_facturado = sum(f.total for f in facturas)
    total_cobrado = sum(f.total for f in facturas if f.estado == EstadoFactura.PAGADA)
    
    # Servicio más solicitado
    servicios_count = {}
    for ag in agendamientos:
        if ag.servicio_id not in servicios_count:
            servicios_count[ag.servicio_id] = 0
        servicios_count[ag.servicio_id] += 1
    
    servicio_mas_solicitado = None
    if servicios_count:
        servicio_id_mas_solicitado = max(servicios_count, key=servicios_count.get)
        servicio = db.query(Servicio).filter(Servicio.id_servicio == servicio_id_mas_solicitado).first()
        servicio_mas_solicitado = {
            "nombre": servicio.nombre_servicio if servicio else "Desconocido",
            "cantidad": servicios_count[servicio_id_mas_solicitado]
        }
    
    return {
        "periodo": f"{año}-{mes:02d}",
        "agendamientos": {
            "total": total_agendamientos,
            "completados": agendamientos_completados,
            "tasa_completado": f"{(agendamientos_completados/total_agendamientos*100):.1f}%" if total_agendamientos > 0 else "0%"
        },
        "ingresos": {
            "total_facturado": float(total_facturado),
            "total_cobrado": float(total_cobrado),
            "pendiente": float(total_facturado - total_cobrado)
        },
        "servicio_mas_solicitado": servicio_mas_solicitado
    }

# ============= DASHBOARD GENERAL =============
@router.get("/dashboard")
def dashboard_general(
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """
    Genera un dashboard con métricas generales del sistema
    Algoritmo: Calcula KPIs principales
    """
    from datetime import date, timedelta
    
    hoy = date.today()
    hace_30_dias = hoy - timedelta(days=30)
    
    # Agendamientos de hoy
    agendamientos_hoy = db.query(func.count(Agendamiento.id_agendamiento)).filter(
        Agendamiento.fecha == hoy
    ).scalar()
    
    # Agendamientos pendientes
    agendamientos_pendientes = db.query(func.count(Agendamiento.id_agendamiento)).filter(
        Agendamiento.estado == EstadoAgendamiento.PENDIENTE
    ).scalar()
    
    # Ingresos últimos 30 días
    ingresos_30_dias = db.query(func.sum(Factura.total)).filter(
        and_(
            func.date(Factura.fecha) >= hace_30_dias,
            Factura.estado == EstadoFactura.PAGADA
        )
    ).scalar() or Decimal(0)
    
    # Total de clientes activos (con al menos un agendamiento)
    clientes_activos = db.query(func.count(func.distinct(Agendamiento.persona_id))).scalar()
    
    # Servicios más populares (últimos 30 días)
    servicios_populares = db.query(
        Servicio.nombre_servicio,
        func.count(Agendamiento.id_agendamiento).label('cantidad')
    ).join(
        Agendamiento, Servicio.id_servicio == Agendamiento.servicio_id
    ).filter(
        Agendamiento.fecha >= hace_30_dias
    ).group_by(
        Servicio.id_servicio
    ).order_by(
        func.count(Agendamiento.id_agendamiento).desc()
    ).limit(5).all()
    
    return {
        "fecha_reporte": hoy,
        "agendamientos_hoy": agendamientos_hoy,
        "agendamientos_pendientes": agendamientos_pendientes,
        "ingresos_ultimos_30_dias": float(ingresos_30_dias),
        "clientes_activos": clientes_activos,
        "servicios_mas_populares": [
            {"nombre": s[0], "cantidad": s[1]} for s in servicios_populares
        ]
    }