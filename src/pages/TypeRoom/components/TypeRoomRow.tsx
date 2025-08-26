import { FiEdit, FiTrash2 } from "react-icons/fi";
import Menus from "../../../components/Menus";
import Modal from "../../../components/Modal";
import Table from "../../../components/Table";
import type { TypeRoom } from "../../../types/type-room.types";
import UpdateTypeRoomContent from "./UpdateTypeRoomContent";
import DeleteTypeRoomContent from "./DeleteTypeRoomContent";
import { IoLocationOutline } from "react-icons/io5";
import { FaBed } from "react-icons/fa";
import { CiUser } from "react-icons/ci";

function TypeRoomRow({ typeRoom }: { typeRoom: TypeRoom }) {
    return (
        <Table.Row>
            {/* Tên phòng */}
            <div className="flex items-center gap-3 py-3">
                <p className="text-sm font-semibold text-gray-100">
                    {typeRoom.name}
                </p>
            </div>

            {/* Introduction */}
            <div className="text-gray-300 text-sm font-medium line-clamp-2 py-3">
                {typeRoom.introduction}
            </div>

            {/* Highlight */}
            <div className="text-gray-400 text-sm line-clamp-2 py-3">
                {typeRoom.highlight}
            </div>

            {/* Size room */}
            <div className="text-gray-200 font-medium whitespace-nowrap py-3">
                <div className="flex items-center gap-3">
                    <IoLocationOutline className="w-4 h-4 text-gray-300" />
                    <span className="text-sm">{typeRoom.sizeRoom}m²</span>
                </div>
            </div>

            {/* Beds */}
            <div className="text-gray-200 font-semibold py-3">
                <div className="flex items-center gap-2">
                    <FaBed className="w-4 h-4 text-gray-300" />
                    <span className="text-sm">{typeRoom.beds}</span>
                </div>
            </div>

            {/* Max People + Actions */}
            <div className="flex items-center justify-between text-gray-200 text-sm font-medium whitespace-nowrap py-3">
                {/* Số - căn giữa cột */}
                <div className="flex items-center gap-2">
                    <CiUser className="w-4 h-4 text-gray-300" />
                    <span className="text-sm">{typeRoom.maxPeople} khách</span>
                </div>

                {/* Actions - sát lề phải */}
                <div className="ml-4">
                    <Modal>
                        <Menus.Menu>
                            <Menus.Toggle id={typeRoom.id.toString()} />
                            <Menus.List id={typeRoom.id.toString()}>
                                <Modal.Open
                                    opens={`update-type-room-${typeRoom.id}`}
                                >
                                    <Menus.Button icon={<FiEdit />}>
                                        Edit
                                    </Menus.Button>
                                </Modal.Open>

                                <Modal.Open
                                    opens={`delete-type-room-${typeRoom.id}`}
                                >
                                    <Menus.Button icon={<FiTrash2 />}>
                                        Delete
                                    </Menus.Button>
                                </Modal.Open>
                            </Menus.List>
                        </Menus.Menu>

                        {/* Unique names để tránh trùng modal id khi nhiều hàng */}
                        <Modal.Content name={`update-type-room-${typeRoom.id}`}>
                            <UpdateTypeRoomContent typeRoomId={typeRoom.id} />
                        </Modal.Content>
                        <Modal.Content name={`delete-type-room-${typeRoom.id}`}>
                            <DeleteTypeRoomContent
                                typeRoomId={typeRoom.id}
                                name={typeRoom.name}
                            />
                        </Modal.Content>
                    </Modal>
                </div>
            </div>
        </Table.Row>
    );
}

export default TypeRoomRow;
