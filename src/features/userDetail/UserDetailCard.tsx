import React from "react";
import type { User } from "../../types/user";

type Props = {
  user: User;
};

export default function UserDetailCard({ user }: Props) {
  if (!user) return null;

  const { name, username, email, phone, website, address, company } = user;
  const addressStr = address
    ? `${address.suite}, ${address.street}, ${address.city} ${address.zipcode}`
    : "";

  return (
    <div className="card user-detail-card" style={{ maxWidth: 720 }}>
      <header className="card-header">
        <p className="card-header-title">
          <span className="title is-4" style={{ marginRight: 8 }}>{name}</span>
          <span className="subtitle is-6 has-text-grey">@{username}</span>
        </p>
      </header>

      <div className="card-content" style={{textAlign: "left"}}>
        <div className="content">
          <dl className="columns is-multiline">
            <div className="column is-3">
              <dt className="has-text-weight-semibold">Email</dt>
            </div>
            <div className="column is-9">
              <dd>
                <a href={`mailto:${email}`}>{email}</a>
              </dd>
            </div>

            <div className="column is-3">
              <dt className="has-text-weight-semibold">Phone</dt>
            </div>
            <div className="column is-9">
              <dd>{phone}</dd>
            </div>

            <div className="column is-3">
              <dt className="has-text-weight-semibold">Website</dt>
            </div>
            <div className="column is-9">
              <dd>
                <a href={`http://${website}`} target="_blank" rel="noreferrer">
                  {website}
                </a>
              </dd>
            </div>

            <div className="column is-3">
              <dt className="has-text-weight-semibold">Address</dt>
            </div>
            <div className="column is-9">
              <dd>{addressStr}</dd>
            </div>

            <div className="column is-3">
              <dt className="has-text-weight-semibold">Company</dt>
            </div>
            <div className="column is-9">
              <dd>{company?.name}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
