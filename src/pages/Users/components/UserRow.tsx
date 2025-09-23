import { FiEdit, FiTrash2 } from "react-icons/fi";
import Menus from "../../../components/Menus";
import Modal from "../../../components/Modal";
import Table from "../../../components/Table";
import UpdateUserContent from "./UpdateUserContent";
import DeleteUserContent from "./DeleteUserContent";
import type { User } from "../../../types/user.type";
import { MdOutlineMail } from "react-icons/md";

function UserRow({ user }: { user: User }) {
    return (
        <Table.Row>
            {/* Name */}
            <div className="flex items-center gap-2 py-3">
                <p className="text-sm font-semibold text-text">{user.name}</p>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 py-3">
                <MdOutlineMail className="w-4 h-4 text-muted-2" />
                <span className="text-sm font-medium text-muted">
                    {user.email}
                </span>
            </div>

            {/* Role */}
            <div className="flex items-center gap-2 py-3">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full capitalize">
                    {user.role}
                </span>
            </div>

            {/* Actions */}
            <div className="flex items-center py-3">
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={user.id} />
                        <Menus.List id={user.id}>
                            <Modal.Open opens={`update-user-${user.id}`}>
                                <Menus.Button icon={<FiEdit />}>
                                    Edit
                                </Menus.Button>
                            </Modal.Open>

                            <Modal.Open opens={`delete-user-${user.id}`}>
                                <Menus.Button icon={<FiTrash2 />}>
                                    Delete
                                </Menus.Button>
                            </Modal.Open>
                        </Menus.List>
                    </Menus.Menu>

                    {/* Modal update */}
                    <Modal.Content name={`update-user-${user.id}`}>
                        <UpdateUserContent userId={user.id} />
                    </Modal.Content>

                    {/* Modal delete */}
                    <Modal.Content name={`delete-user-${user.id}`}>
                        <DeleteUserContent userId={user.id} name={user.name} />
                    </Modal.Content>
                </Modal>
            </div>
        </Table.Row>
    );
}

export default UserRow;
