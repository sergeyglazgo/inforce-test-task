import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProduct, getProduct } from '../../api/Goods';
import { loadProductAction } from '../../store/actions';
import { getProductSelector } from '../../store/selectors';

export const EditProductForm: React.FC = () => {
  const dispatch = useDispatch();
  const product = useSelector(getProductSelector);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [inputValues, setInputValues] = useState({
    imageUrl: '',
    name: '',
    count: '',
    width: '',
    height: '',
    weight: '',
  });

  const loadProduct = async () => {
    if (product) {
      const productFromServer = await getProduct(product.id);

      dispatch(loadProductAction(productFromServer));
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setInputValues({
      ...inputValues,
      [inputName]: inputValue,
    });
  };

  const handleEditProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (product) {
      await editProduct(
        product.id,
        inputValues.imageUrl,
        inputValues.name,
        inputValues.count,
        inputValues.width,
        inputValues.height,
        inputValues.weight,
      );
      loadProduct();
    }

    setIsFormVisible(false);
  };

  useEffect(() => {
    if (product) {
      setInputValues({
        imageUrl: product.imageUrl,
        name: product.name,
        count: product.count,
        width: product.size.width,
        height: product.size.height,
        weight: product.weight,
      });
    }
  }, [product]);

  return (
    <div>
      <button
        type="button"
        className="Product__button button"
        onClick={() => setIsFormVisible(true)}
      >
        Edit
      </button>
      {isFormVisible && (
        <form onSubmit={handleEditProduct}>
          <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Edit product</p>
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
                  onClick={() => setIsFormVisible(false)}
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
