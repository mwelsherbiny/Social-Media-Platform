import { expect, test } from "vitest";
import exlcudeKeys from "../../util/excludeKey";

test("exclude unsafe keys from user", () => {
  const user = {
    id: 1,
    username: "Joe",
    email: "JoeDoe@gmail.com",
    password: "1234",
  };
  const safeUser = exlcudeKeys(user, ["email", "password"]);
  expect(Object.keys(safeUser)).toEqual(["id", "username"]);
});
