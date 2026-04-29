import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUSer } from "../features/User/UserSlice";
import DataTable from "react-data-table-component/dist/index.es.js";
import { ActionButton, UserActionButton, UserColumns } from "../utill/Helper";
import { NavLink } from "react-router-dom";
const User = () => {
  const dispatch = useDispatch();

  const { user, success } = useSelector((state) => state.user);
  const [users, setUsers, loading] = useState({});
  useEffect(() => {
    dispatch(getAllUSer());
  }, [dispatch,success,user]);

  useEffect(() => {
    if (!Array.isArray(user)) return;
    let sno = 1;

    const data = user.map((User) => ({
      sno: sno++,
      name: User.name,
      email: User.email,
      role: User.role,
      action:<UserActionButton userId={User._id} />
    }));
    setUsers(data);
  }, [dispatch, user ]);

  return (
    <div className="pt-10 ml-10 mr-10 ">
      <div className="py-5">
        <div className="text-center">
          <h3 className="text-2xl font-bold">Manage Users</h3>
        </div>
        <div className="flex justify-between items-center">
          <input className="px-4 py-0.5" />
          <NavLink
            to="/admin-dashboard/user/register"
            className="px-4 ml-10 py-1 bg-teal-600 rounded-md text-white"
          >
            Add New New User
          </NavLink>
        </div>
        <div className="mt-6 rounded-md">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <DataTable
                columns={UserColumns}
                data={Array.isArray(users) ? users : []}
                pagination
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
