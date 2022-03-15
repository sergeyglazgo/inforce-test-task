import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteGood, getGoods } from '../api/Goods';
import { loadGoodsAction } from '../store/actions';
import { getGoodsSelector } from '../store/selectors';
import { AddGoodForm } from './AddGoodForm';

export const GoodsList:React.FC = () => {
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [goodId, setGoodId] = useState(0);
  const dispatch = useDispatch();
  const goods = useSelector(getGoodsSelector);

  const loadGoods = async () => {
    const goodsFromServer: Good[] = await getGoods();

    dispatch(loadGoodsAction(goodsFromServer));
  };

  const handleDeleteConfirmation = (selectedGoodId: number) => {
    setIsDeleteVisible(true);
    setGoodId(selectedGoodId);
  };

  const handleDelete = async () => {
    await deleteGood(goodId);
    setIsDeleteVisible(false);
    loadGoods();
  };

  useEffect(() => {
    loadGoods();
  }, []);

  return (
    <div>
      <h1 className="title">Goods</h1>
      <ul>
        {goods.map(good => (
          <li key={good.id}>
            <p>
              {`${good.name}\n`}
            </p>
            <button
              type="button"
              className="button"
              onClick={() => handleDeleteConfirmation(good.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {isDeleteVisible && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Delete item?</p>
            </header>
            <footer className="modal-card-foot">
              <button
                className="button is-success"
                type="submit"
                onClick={handleDelete}
              >
                Confirm
              </button>
              <button
                className="button"
                type="button"
                onClick={() => setIsDeleteVisible(false)}
              >
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}

      <AddGoodForm goodId={+goods[goods.length]} />
    </div>
  );
};
