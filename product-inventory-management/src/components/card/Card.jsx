import "./card.scss";

const Card = (props) => {
    return (
        <div className="card">
            <div className="card-img">
                <img src={props.imgPath} alt="card image" />
            </div>
            <div className="card-content">
                <h1 className="card-title">{props.title}</h1>
                <p className="card-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus minus veritatis,
                    excepturi soluta et unde distinctio quae vel, sed nobis aut dignissimos architecto. Quia atque dolor nihil repellendus neque? Iusto.</p>
            </div>
        </div>
    )
}

export default Card;