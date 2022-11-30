import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        Myblog
      </Link>
      <nav>
        <Link to="/create">Create new post</Link>
      </nav>
    </header>
  );
}
