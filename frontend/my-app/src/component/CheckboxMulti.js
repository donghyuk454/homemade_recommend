import React, {useState} from "react"

const CheckboxMulti = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());

  const [ids, setIds] = useState([]);

  // console.log(props);
  const formData = props.formData;
  console.log(props.formData);

  const handler = props.handler;

  const checkedItemHandler = (box, id, isChecked) => {
      if (isChecked) {
        checkedItems.add(id);
        setCheckedItems(checkedItems);
        
        let newIds = [];
        for (var i = 0; i < ids.length; i++) {
          newIds.push(ids[i]);
        }
        newIds.push(parseInt(id));
        setIds(newIds);
        handler(newIds);
      } else if (!isChecked && checkedItems.has(id)) {
        checkedItems.delete(id);
        setCheckedItems(checkedItems);

        let newIds = [];
        for (var i = 0; i < ids.length; i++) {
          newIds.push(ids[i]);
        }
        newIds.delete(parseInt(id));
        setIds(newIds);
        handler(newIds);
      }
      return checkedItems;
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

export default CheckboxMulti;