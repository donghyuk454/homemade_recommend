import React, {useState} from "react"

const CheckboxMulti = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());

  const [ids, setIds] = useState([]);

  // console.log(props);
  const formData = props.formData;
  console.log(props.formData);

  const handler = props.handler;

  const getIndex = (value) => {
    for (var i = 0; i < formData.length; i++) {
      if (formData[i].name === value) {
        return formData[i].id;
      }
    }
    return -1;
  }

  const checkedItemHandler = (box, id, isChecked) => {
      if (isChecked) {
        const idx = getIndex(id);
        if (idx === -1) {
          return checkedItems;
        }
        checkedItems.add(id);
        setCheckedItems(checkedItems);
        console.log(id);
        let newIds = [];
        for (var i = 0; i < ids.length; i++) {
          newIds.push(ids[i]);
        }
        newIds.push(idx);
        setIds(newIds);
        console.log(newIds);
        handler(newIds);
      } else if (!isChecked && checkedItems.has(id)) {
        checkedItems.delete(id);
        setCheckedItems(checkedItems);

        let newIds = [];
        for (var i = 0; i < ids.length; i++) {
          newIds.push(ids[i]);
        }
        let delete_idx = getIndex(id);
        let arr = newIds.filter(function(data) {
          return data != delete_idx;
        });

        console.log(newIds);
        console.log(newIds);
        setIds(arr);
        handler(arr);
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