
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const DiscoverPage = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await supabase.from("users").select("*");
      if (data) setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Discover Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default DiscoverPage;
