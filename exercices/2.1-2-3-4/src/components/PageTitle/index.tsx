

interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  return <h1>{title}</h1>;
};

export default PageTitle;
