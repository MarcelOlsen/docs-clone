import Link from "next/link";

const Home = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Home</p>
      <Link href="/documents/123">Quick link</Link>
    </div>
  );
};
export default Home;
