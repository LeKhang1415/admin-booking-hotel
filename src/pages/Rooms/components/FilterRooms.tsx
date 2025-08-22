import useTypeRoom from "../hooks/useTypeRoom";
import { RoomStatus } from "../../../types/room.types";
import FilterSelect from "../../../components/FilterSelect";
import FilterInput from "../../../components/FilterInput";
import FilterRadio from "../../../components/FilterRadio";
import Modal from "../../../components/Modal";
import { useSearchParams } from "react-router-dom";
import Button from "../../../components/Button";
import { capitalizeFirst } from "../../../utils/utils";

export default function FilterRooms({ close }: { close?: () => void }) {
    const { typeRoom } = useTypeRoom();
    const [searchParams, setSearchParams] = useSearchParams();

    // Options cho status
    const statusOpts = Object.values(RoomStatus).map((s) => ({
        label: capitalizeFirst(s),
        value: s,
    }));

    // Options cho typeRoom (lấy từ API)
    const typeRoomOpts =
        typeRoom?.map((tr) => ({ label: tr.name, value: tr.id })) || [];

    const priceTypeOpts = [
        { label: "Hour", value: "hour" },
        { label: "Day", value: "day" },
    ];

    // Reset toàn bộ filter
    const handleReset = () => {
        setSearchParams({});
        close?.();
    };

    const handleOk = () => {
        console.log("Filters:", Object.fromEntries(searchParams.entries()));
        close?.();
    };

    return (
        <>
            <Modal.Header>Filter Rooms</Modal.Header>
            <Modal.Body>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Status dùng radio */}
                    <FilterRadio
                        label="Status"
                        field="status"
                        options={statusOpts}
                    />

                    {/* Room type vẫn dùng select */}
                    <FilterSelect
                        label="Room Type"
                        field="typeRoomId"
                        options={typeRoomOpts}
                    />

                    <FilterInput
                        label="Number of People"
                        field="numberOfPeople"
                    />

                    {/* PriceType dùng radio */}
                    <FilterRadio
                        label="Price Type"
                        field="priceType"
                        options={priceTypeOpts}
                    />

                    {/* Input filter */}
                    <FilterInput label="Min Price" field="minPrice" />
                    <FilterInput label="Max Price" field="maxPrice" />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex justify-between items-center gap-4">
                    {/* Reset button */}
                    <Button
                        type="button"
                        onClick={handleReset}
                        className="px-4 py-2 text-gray-300 bg-gray-600 rounded-md hover:bg-gray-700 transition-colors"
                    >
                        Reset All
                    </Button>

                    {/* Action buttons */}
                    <Button type="button" onClick={handleOk}>
                        Ok
                    </Button>
                </div>
            </Modal.Footer>
        </>
    );
}
