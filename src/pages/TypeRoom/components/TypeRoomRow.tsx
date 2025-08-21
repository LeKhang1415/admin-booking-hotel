import { FiEdit, FiTrash2 } from "react-icons/fi";
import Menus from "../../../components/Menus";
import Modal from "../../../components/Modal";
import Table from "../../../components/Table";
import type { TypeRoom } from "../../../types/type-room.types";
import UpdateTypeRoomContent from "./UpdateTypeRoomContent";

function TypeRoomRow({ typeRoom }: { typeRoom: TypeRoom }) {
    return (
        <Table.Row>
            {/* Tên phòng */}
            <div className="flex items-center gap-3 py-2">
                <p className="text-sm font-semibold text-white">
                    {typeRoom.name}
                </p>
            </div>

            {/* Introduction */}
            <div className="text-gray-300 text-sm font-medium line-clamp-2">
                {typeRoom.introduction}
            </div>

            {/* Highlight */}
            <div className="text-gray-400 text-sm line-clamp-2">
                {typeRoom.highlight}
            </div>

            {/* Size room */}
            <div className="text-gray-200 font-medium whitespace-nowrap">
                {typeRoom.sizeRoom} m²
            </div>

            {/* Beds */}
            <div className="text-green-400 font-semibold">{typeRoom.beds}</div>

            {/* Max People + Actions */}
            <div className="flex items-center justify-between text-gray-200 text-sm font-medium whitespace-nowrap w-full">
                {/* Số - căn giữa cột */}
                <span className="mx-auto w-6 text-center">
                    {typeRoom.maxPeople}
                </span>

                {/* Actions - sát lề phải */}
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={typeRoom.id.toString()} />
                        <Menus.List id={typeRoom.id.toString()}>
                            <Modal.Open opens="update-type-room">
                                <Menus.Button
                                    icon={<FiEdit className="text-blue-400" />}
                                >
                                    Edit
                                </Menus.Button>
                            </Modal.Open>

                            <Menus.Button
                                icon={<FiTrash2 className="text-red-400" />}
                            >
                                Delete
                            </Menus.Button>
                        </Menus.List>
                    </Menus.Menu>

                    <Modal.Content name="update-type-room">
                        <UpdateTypeRoomContent typeRoomId={typeRoom.id} />
                    </Modal.Content>
                </Modal>
            </div>
        </Table.Row>
    );
}

export default TypeRoomRow;
