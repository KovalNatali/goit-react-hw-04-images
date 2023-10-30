import { Component } from "react"
import toast, { Toaster } from 'react-hot-toast';
import { SearchBar } from "./Searchbar/Searchbar";
import {ButtonLoad } from "./ButtonLoad/ButtonLoad";
import { fetchImage } from "./Api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";


export class App extends Component {
  state = {
     query: '',
     images: [],
     page: 1,
     error: false,
     loading: false,
     totalHits: 0,
     selectedImage: '',
     isModal: false,
  };


  handalSubmit = evt => {
    evt.preventDefault();
    this.setState({
    query: `${Date.now()}/${evt.target.elements.query.value}`,
      images: [],
      page:1,
      loading:false,
      error: false,
    })
  }

  handalLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));

    };

    handleClickImage = e => {
      e.preventDefault();
      console.log(e.target.src);
    };

    onOpenModal = imageURL => {
      this.setState({ isModal: true, selectedImage: imageURL });
    };
  
    onCloseModal = () => {
      this.setState({ isModal: false, selectedImage: '' });
    };

 async componentDidUpdate (prevProps, prevState) {
    if (prevState.query !== this.state.query ||
      prevState.page !== this.state.page ) {
       
        try {
          this.setState({loading: true, error: false })
          const images = await fetchImage(this.state.query.split('/')[1], this.state.page);

          if (images.hits.length === 0) {
           toast.error('Nothing was found for your image request');
          }
        
        if (prevState.query === this.state.query) {
          this.setState({
            images: [...prevState.images, ...images.hits],
            totalHits: images.totalHits,
          });
        } else {
          this.setState({ images: images.hits, totalHits: images.totalHits });
        }
    } catch (error) {
          toast.error('Oops! Try to reload the page.');
          this.setState({ error: true})
        } finally {
          this.setState({ loading: false });
        }
     };
    }


 
  render() {
 return (
    <div className="gallary">
     <SearchBar onSubmit = {this.handalSubmit} />
     {this.state.loading && <Loader />}
     <ImageGallery
          images={this.state.images}
          onOpenModal={this.onOpenModal}
        />
     {this.state.page < Math.ceil(this.state.totalHits / 12) ? (
    <ButtonLoad onClick = {this.handalLoadMore}/>
        ) : null}
          {this.state.isModal && (
          <Modal
          largeImage={this.state.selectedImage}
          onClick={this.onCloseModal}
          onCloseModal={this.onCloseModal}
          />
        )}
       <Toaster position="top-right"/>
     </div>
  );
  };
 
};
