import Table from "../../components/Table";
import Menus from "../../components/Menus";
import Pagination from "../../components/Pagination";
import Main from "../../components/Main";
import Heading from "../../components/Heading";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Spinner from "../../components/Spinner";
import useUsers from "./hooks/useUsers";
import UserRow from "./components/UserRow";
import CreateUserContent from "./components/CreateUserContent";

function User() {
    const { users, isLoading, totalPages } = useUsers();

    return (
        <Main>
            <Heading>
                <>
                    <div className="text-white">User Management</div>
                    <Modal>
                        <Modal.Open opens="create-user">
                            <Button className="px-6 py-3">+ New User</Button>
                        </Modal.Open>
                        <Modal.Content name="create-user">
                            <CreateUserContent />
                        </Modal.Content>
                    </Modal>
                </>
            </Heading>

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
