export default function Card({ title, subtitle, children, footer }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
        {subtitle && <small>{subtitle}</small>}
      </div>
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}
