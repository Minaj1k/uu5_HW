import { shallow } from "enzyme";
import UuTodoList from "uu_todolist_maing01-hi";

describe(`UuTodoList.Main.Item`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuTodoList.Main.Item />);
    expect(wrapper).toMatchSnapshot();
  });
});
