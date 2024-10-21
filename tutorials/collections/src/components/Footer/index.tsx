
import './Footer.css';

interface FooterProps {
  logo: string;
}

const Footer = (props: FooterProps) => {
  return (
    <footer>
      <h1 className="animate__animated animate__bounce animate__delay-2s">
        But we also love JS
      </h1>
      <img src={props.logo} alt="JS Logo" />
    </footer>
  );
};

export default Footer;
