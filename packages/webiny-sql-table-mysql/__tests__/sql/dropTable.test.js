import { UserTable } from "./../tables";
import { dropTable } from "webiny-sql-table-mysql/sql";

describe("DROP TABLE SQL test", () => {
    test("should drop statements correctly", async () => {
        const userTable = new UserTable();
        expect(dropTable(userTable)).toEqual("DROP TABLE IF EXISTS `Users`;");
    });
});
