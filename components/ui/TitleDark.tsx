"use client";

type TitleType = {
  className?: string;
  category?: string;
  title: string;
  description?: string;
  descriptionStyles?: string;
};

export default function TitleDark({
  className = "",
  category,
  title,
  description,
  descriptionStyles = "",
}: TitleType) {
  return (
    <div className={`title-dark ${className}`}>
      <p className="title-dark__category">{category}</p>
      <h1 className="title-dark__title">
        {title}
      </h1>
      <div>
        <p className={`title-dark__description ${descriptionStyles}`}>
          {description &&
            description.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
        </p>
      </div>
    </div>
  );
}
