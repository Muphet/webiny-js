import { Table } from "webiny-sql-table";

const table = new Table();

describe("default Table test", () => {
    test("getComment should return empty string by default", async () => {
        expect(table.getComment()).toEqual("");
    });

    test("getAutoIncrement should return 0 by default", async () => {
        expect(table.getAutoIncrement()).toEqual(0);
    });

    test("default database methods should return empty results", async () => {
        expect(await table.create()).toBeNull();
        expect(await table.alter()).toBeNull();

        expect(await table.drop()).toBeNull();
        expect(await table.truncate()).toBeNull();
    });
});
