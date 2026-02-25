"use client";

type TitleType = {
  className?: string;
  category?: string;
  title: string;
  description?: string;
  descriptionStyles?: string;
  titleStyles?: string;
};

export default function TitleLight({
  className = "",
  category,
  title,
  description,
  descriptionStyles = "",
  titleStyles = "",
}: TitleType) {
  return (
    <div className={`title-light ${className}`}>
      <p className="title-light__category">{category}</p>
      <h1 className={`title-light__title ${titleStyles}`}>
        {title &&
          title.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}{" "}
      </h1>
      <div>
        <p className={`title-light__description ${descriptionStyles}`}>
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
