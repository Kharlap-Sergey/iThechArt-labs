import { formatDate } from 'shared/utils/formater';
import { formatNumberToTypeOfAd } from 'shared/utils/formater';

test("formate type 1 to name to lease", ()=>{
  expect(formatNumberToTypeOfAd(1)).toBe("to lease");
})
test("formate type 2 to name to rent", ()=>{
  expect(formatNumberToTypeOfAd(2)).toBe("to rent");
})
test("formate type other to be undefined", ()=>{
  expect(formatNumberToTypeOfAd(3)).toBe(undefined);
})