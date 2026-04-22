import React from "react";
import type { User } from "../../types/user";

interface Props {
  user: User;
}

const UserDetail: React.FC<Props> = ({ user }) => {
  return (
    <section>
      <h2>
        {user.name} ({user.username})
      </h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Website:</strong>{" "}
        <a href={`http://${user.website}`} target="_blank" rel="noreferrer">
          {user.website}
        </a>
      </p>
      <address>
        <strong>Address:</strong>
        <div>
          {user.address.street} {user.address.suite}
        </div>
        <div>
          {user.address.city} {user.address.zipcode}
        </div>
      </address>
      <p>
        <strong>Company:</strong> {user.company.name}
      </p>
    </section>
  );
};

export default UserDetail;
