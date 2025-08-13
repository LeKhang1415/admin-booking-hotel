import Table from "../../components/Table";

function Rooms() {
    return (
        <Table>
            <Table.Header
                header={[
                    "Phòng",
                    "Tên phòng",
                    "Loại phòng",
                    "Giá/ngày",
                    "Giá/giờ",
                    "Sức chứa",
                    "Tiện nghi",
                    "Trạng thái",
                ]}
            />
        </Table>
    );
}

export default Rooms;
