interface ICardProps {
    point?: number | string
}
export default function Card({ point = 0 } : ICardProps) {
    return (
        <div className="card">
            {point}
        </div>
    )
}