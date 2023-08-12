export default function AuthFormTitle({ title }) {
  return (
    <div className="title">
      <h1
        className={`${
          title === "Forgot Password" || title === "Reset Password"
            ? "text-4xl"
            : "text-5xl"
        } font-bold`}
      >
        {title}
      </h1>
    </div>
  );
}
