"use client";

type FakeButtonType = {
  text: string | React.ReactNode;
  className?: string;
};

export default function FakeButton({ text, className = "" }: FakeButtonType) {
  return (
    <div className={`btn-fake ${className}`}>
      {text}
    </div>
  );
}
