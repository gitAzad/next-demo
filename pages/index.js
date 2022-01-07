import Link from 'next/link';

const Home = ({ data }) => {
  return (
    <div>
      <Link href={'/about'}>go to About</Link>
      <h1>hello</h1>
      {data &&
        data.map((it) => {
          return <h1 key={it.id}>{it.title}</h1>;
        })}
    </div>
  );
};

export default Home;

export async function getStaticProps(context) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}
