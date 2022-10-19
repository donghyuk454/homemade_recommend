import React, {useState} from "react"

const Checkbox = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    const [checkedItem, setCheckedItem] = useState(1);

    // console.log(props);
    const formData = props.formData;
    const handler = props.handler;
    console.log(props.formData);

    const checkedItemHandler = (box, id, isChecked) => {
      if (isChecked) {
        console.log(parseInt(id));
        setCheckedItem(parseInt(id));
        console.log(box);
        handler(parseInt(id));
      } else {
        console(id);
        setCheckedItem(0);
        handler(0);
      }
      return checkedItem;
    };

    const checkHandler = ({ target }) => {
      setIsChecked(!isChecked);
      checkedItemHandler(target.parentNode, target.value, target.checked);
    };

    return (
      <div className="contStyle">
        {formData.map((item) => (
          <label key={item.id} className="innerBox">
            <input
              type="checkbox"
              value={item.name}
              onChange={(e) => checkHandler(e)}
            />
            <div>{item.name}</div>
          </label>
        ))}
      </div>
    );
}

export default Checkbox;