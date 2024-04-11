import { NavBar } from "./navbar";
import { UserNav } from "./usernav";

export default function FullNav() {
    return (
        <div>
            <NavBar>
                <UserNav />
            </NavBar>

        </div>
    );
}