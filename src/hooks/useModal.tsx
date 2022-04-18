

import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { IconClose, IconCloud2 } from "../icons/icons";
import { useMethodFirebase } from "./useMethodFirebase";

const useModal = () => {


  const [isModal, setCloseModal] = useState<boolean>(false);
  const [isId, setId] = useState<string>("");
  const [isInputValue, setIsInputValue] = useState<string>('');

  const getValue = (event: ChangeEvent<HTMLInputElement>): void => {


    const value = event.target.value;
    setIsInputValue(value)


  }

  const { updateName } = useMethodFirebase();
  const closeModal = () => {
    setCloseModal(false);
    setIsInputValue('')

  };
  const openModal = (id: string) => {
    setCloseModal(!isModal);
    setId(id)
  };

  const editModal = () => {
    setCloseModal(!isModal);
  };


  const HandlerClick = () => {
    updateName(isId, isInputValue)
    closeModal()
    setIsInputValue('')
  };


  const ModalView = (): JSX.Element => {
    return (
      <Container modal={isModal}>

        {isModal && <Global />}

        <Card>
          <CloseBottom onClick={closeModal}>
            <IconClose />
          </CloseBottom>
          <Icon>
            <IconCloud2 />
          </Icon>
          <input type="text" placeholder='Rename Cloud File' required={true} className='input is-medium' onChange={getValue} value={isInputValue} autoFocus />
          <button className="generalBotton" onClick={HandlerClick}>Send</button>

        </Card>
      </Container>
    );
  };
  return {
    ModalView,
    openModal,
    closeModal,
    editModal,
  } as const
};

export { useModal };


interface ModalS {
  readonly modal: boolean;
};

const Global = styled.div`

body{
  overflow-x: hidden;
}`

const Container = styled.div<ModalS>`
overflow-y: hidden;
  background: rgba(0, 0, 0, 0.7);
  display: ${(props) => props.modal ? "flex" : "none"};
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  align-items: baseline;
  justify-content: center;
  /* align-self: center; */
  left: 0;
  z-index: 6;
`;



const Card = styled.div`
  background: #fff;
  margin: 5rem 1rem;
  border-radius: 5px;
  max-width: 65rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  min-width: 85vw;
  /* align-self: center; */

  word-wrap: break-word;
  gap: 3rem;
  @media (min-width: 768px) {
    min-width: 40rem;
    margin: 10rem 1rem;
  }
`;

const CloseBottom = styled.button`
  max-height: 4rem;
  background: none;
  border: none;
  box-shadow: none;
  display: flex;
  justify-content: end !important;
  &:hover {
    cursor: pointer;
    svg {
      transform: scale(1.4);
    }
  }
`;

const Icon = styled.div`
    margin: 0 auto;

svg{
  height: 8rem;
    width: 8rem;
}

`
