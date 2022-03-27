/* eslint-disable no-case-declarations */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, getSortedGoods, getProduct } from '../../api/Goods';
import { loadGoodsAction, loadProductAction } from '../../store/actions';
import { getGoodsSelector } from '../../store/selectors';
import { AddProductForm } from '../AddProductForm/AddProductForm';
import './GoodsList.scss';

export const GoodsList:React.FC = () => {
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [productId, setProductId] = useState(0);
  const dispatch = useDispatch();
  const goods = useSelector(getGoodsSelector);

  const loadGoods = async () => {
    const goodsFromServer: Product[] = await getSortedGoods();

    dispatch(loadGoodsAction(goodsFromServer));
  };

  const handleDeleteConfirmation = (selectedProductId: number) => {
    setIsDeleteVisible(true);
    setProductId(selectedProductId);
  };

  const handleDelete = async () => {
    await deleteProduct(productId);
    setIsDeleteVisible(false);
    loadGoods();
  };

  const handleSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'alphabet':
        dispatch(loadGoodsAction([...goods].sort((a, b) => a.name[0].localeCompare(b.name[0]))));
        break;

      case 'count':
        dispatch(loadGoodsAction([...goods].sort((a, b) => +b.count - +a.count)));
        break;

      default:
        dispatch(loadGoodsAction(goods));
    }
  };

  const loadProduct = async (id: number) => {
    const productFromServer = await getProduct(id);

    dispatch(loadProductAction(productFromServer));
  };

  useEffect(() => {
    loadGoods();
  }, []);

  return (
    <div>
      <div className="GoodsList">
        <h2 className="GoodsList__title">Goods:</h2>
        <div className="GoodsList__list-container">
          <div className="select GoodsList__select">
            <select id="sortBy" onChange={handleSortBy}>
              <option value="">Sort by:</option>
              <option value="alphabet">Alphabet</option>
              <option value="count">Count</option>
            </select>
          </div>
          <ul className="GoodsList__list">
            {goods.map(product => (
              <li
                key={product.id}
                className="GoodsList__item"
              >
                <img src={product.imageUrl} alt="placeholder" />
                <h3 className="GoodsList__product-title">{product.name}</h3>
                <span className="GoodsList__product-count">
                  Count:&nbsp;
                  {product.count}
                </span>
                <div className="GoodsList__buttons buttons">
                  <Link
                    to={`${product.id}`}
                    type="button"
                    className="GoodsList__user-button button"
                    onClick={() => loadProduct(product.id)}
                  >
                    More
                  </Link>
                  <button
                    type="button"
                    className="GoodsList__user-button button"
                    onClick={() => handleDeleteConfirmation(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isDeleteVisible && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Delete product?</p>
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

      <AddProductForm productId={+goods[goods.length]} />
    </div>
  );
};
