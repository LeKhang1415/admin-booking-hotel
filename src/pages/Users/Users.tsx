import Table from "../../components/Table";
import Menus from "../../components/Menus";
import Pagination from "../../components/Pagination";
import Main from "../../components/Main";
import Heading from "../../components/Heading";
import Modal from "../../components/Modal";
import Spinner from "../../components/Spinner";
import useUsers from "./hooks/useUsers";
import UserRow from "./components/UserRow";
import CreateUserContent from "./components/CreateUserContent";
import { GoPlus } from "react-icons/go";

import useUrl from "../../hooks/useUrl";
import Search from "../../components/Search";

function User() {
    const { currentValue: search, handler: setSearch } = useUrl<string>({
        field: "search",
        defaultValue: "",
    });

    const { users, isLoading, totalPages } = useUsers();

    return (
        <Main>
            <Heading>
                <>
                    <div>
                        <h1 className="text-3xl font-bold text-text">
                            Manage Users
                        </h1>
                    </div>
                    <Modal>
                        <Modal.Open opens="create-user">
                            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent to-accent-600 text-white rounded-xl hover:shadow-lg transition-all">
                                <GoPlus className="w-4 h-4" />
                                Create user
                            </button>
                        </Modal.Open>
                        <Modal.Content name="create-user">
                            <CreateUserContent />
                        </Modal.Content>
                    </Modal>
                </>
            </Heading>
            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search value={search ?? ""} onChange={setSearch} />
                        </div>
                    </div>
                </div>
            </div>
            {isLoading && (
                <div className="h-full center">
                    <Spinner size="lg" />
                </div>
            )}

            {!isLoading && (
                <div className="flex-1 mt-4">
                    <Menus>
                        <Table columns="1.5fr 2fr 1fr 1fr">
                            <Table.Header>
                                <div>Name</div>
                                <div>Email</div>
                                <div>Role</div>
                                <div>Actions</div>
                            </Table.Header>

                            <Table.Body
                                data={users}
                                render={(user) => (
                                    <UserRow key={user.id} user={user} />
                                )}
                            />

                            <Table.Footer>
                                <Pagination
                                    className="flex justify-between mb-[20px] px-5 mt-2"
                                    totalPages={totalPages}
                                />
                            </Table.Footer>
                        </Table>
                    </Menus>
                </div>
            )}
        </Main>
    );
}

export default User;
