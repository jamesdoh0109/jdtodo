import ButtonToLink from "../components/common/Button/ButtonToLink";

function Home() {
  return (
    <div className="m-auto text-center py-10">
      <div className="mx-auto flex flex-col gap-9">
        <h1 className="text-5xl font-bold">JDTodo</h1>
        <div className="buttons flex flex-col gap-3">
          <ButtonToLink href="/login" text="Log In"/>
          <ButtonToLink href="/signup" text="Sign Up"/>
        </div>
      </div>
    </div>
  );
}

export default Home;
