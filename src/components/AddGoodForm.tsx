import React, { useState } from 'react';
import { postGood } from '../api/Goods';

interface Props {
  goodId: number,
}

export const AddGoodForm:React.FC<Props> = ({ goodId }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [inputValues, setInputValues] = useState({
    imageUrl: '',
    name: '',
    count: '',
    width: '',
    height: '',
    weight: '',
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setInputValues({
      ...inputValues,
      [inputName]: inputValue,
    });
  };

  const handleAddGood = async () => {
    await postGood(
      goodId,
      inputValues.imageUrl,
      inputValues.name,
      +inputValues.count,
      +inputValues.width,
      +inputValues.height,
      inputValues.weight,
    );
  };

  const handleCancel = () => {
    setInputValues({
      imageUrl: '',
      name: '',
      count: '',
      width: '',
      height: '',
      weight: '',
    });
    setIsFormVisible(false);
  };

  return (
    <div>
      <button
        type="button"
        className="button"
        onClick={() => setIsFormVisible(true)}
      >
        Add
      </button>

      {isFormVisible && (
        <form onSubmit={handleAddGood}>
          <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Add good</p>
              </header>
              <section className="modal-card-body">
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Photo url"
                      name="imageUrl"
                      value={inputValues.imageUrl}
                      onChange={handleInput}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Title"
                      name="name"
                      value={inputValues.name}
                      onChange={handleInput}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Count"
                      name="count"
                      value={inputValues.count}
                      onChange={handleInput}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Width"
                      name="width"
                      value={inputValues.width}
                      onChange={handleInput}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Height"
                      name="height"
                      value={inputValues.height}
                      onChange={handleInput}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Weight"
                      name="weight"
                      value={inputValues.weight}
                      onChange={handleInput}
                      required
                    />
                  </div>
                </div>
              </section>
              <footer className="modal-card-foot">
                <button
                  className="button is-success"
                  type="submit"
                >
                  Confirm
                </button>
                <button
                  className="button"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </footer>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
