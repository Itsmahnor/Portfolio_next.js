export default async function ServerDemo() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users",
    {
      cache: "no-store",
    }
  );

  const users = await res.json();

  return (
    <>
      <h1>SSR Demo</h1>

      {users.map((user: { id: number; name: string }) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </>
  );
}