async function getDataFromServer(repo: string) {
    //2 seconds delay, just for explaination
    // var n = 3 + Math.floor(Math.random() * 5);
    await timeout( 5000);
    const res = await fetch("https://api.github.com/users/" + repo, {
      cache: "force-cache",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data : " + res.status);
    }
    var x = await res.json();
    return x;
  }

  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }
  
  export default async function RepoComponent() {
    const profile = await getDataFromServer('onkarnora');
    return (
      <main className="p-5 border-red-100 ">
        <table className="table-fixed">
          <tbody>
            <tr>
              <th className="border border-slate-300 p-3">Login</th>
              <td className="border border-slate-300 p-3">{profile.login}</td>
            </tr>
            <tr>
              <th className="border border-slate-300 p-3">Followers</th>
              <td className="border border-slate-300 p-3">{profile.followers}</td>
            </tr>
            <tr>
              <th className="border border-slate-300 p-3">Image</th>
              <td className="border border-slate-300 p-3">
                <img
                  src={profile.avatar_url}
                  style={{ width: 40, height: "auto" }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    );
  }