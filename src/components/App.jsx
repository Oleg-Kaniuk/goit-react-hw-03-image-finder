import { Component } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchPhoto, fetchError } from "./api/api";
import { AppContainer } from "./App.styled";

const perPage = 12;

export const styleNotify = {
  position: 'top-right',
  timeout: 2000,
  width: '300px',
  fontSize: '20px'
};

export class App extends Component {
  state = {
    page: 1,
    search: '',
    photos: [],
    isLoading: false,
    btnLoadMore: false,
    openModal: false,
    selectedPhoto: null,
  }

  componentDidUpdate = (_, prevState) => {
    const nextPage = this.state.page;
    const nextSearch = this.state.search;
    const prevPage = prevState.page;
    const prevSearch = prevState.search;

    if (prevSearch !== nextSearch || prevPage !== nextPage) {
      this.addNewPage(nextSearch, nextPage);
    };
  }

  addNewPage = (search, page) => {
    this.setState({ isLoading: true });

    fetchPhoto(search, page, perPage)
      .then(data => {
        const { totalHits } = data;
        const totalPage = Math.ceil(data.totalHits / perPage);
        if (totalHits === 0) {
          return Notify.failure('Sorry, there are no images matching your search query. Please try again.', styleNotify);
        }

        const photoArray = data.hits.map(({ id, webformatURL, largeImageURL, tags }) => (
          { id, webformatURL, largeImageURL, tags }
        ));
        
        this.setState(prevState =>
          ({ photos: [...prevState.photos, ...photoArray] }));
        
        if (totalPage > page) {
          this.setState({ btnLoadMore: true })
        } else {
          Notify.info("We're sorry, but you've reached the end of search results.", styleNotify);
          this.setState({ btnLoadMore: false });
        };
      })
      .catch(fetchError)
      .finally(() => {
        this.setState({ isLoading: false });
      });
    };

  render() {
    // const { photos, isLoading, btnLoadMore, openModal, selectedPhoto } = this.state;
    
    return (
      <div>
        <h1>Image finder</h1>
        <AppContainer>
        
        </AppContainer>
      </div>
    );
  }
};