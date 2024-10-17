import React, { useState } from "react";
import Cards from "./altComponents/Cards";
import Deneme from "./altComponents/deneme";

function Main() {
  const [openMenu, setOpenMenu] = useState(null);
  return (
    <div className="mt-4 p-4 flex gap-4">
      <Deneme />
      <Cards
        title="deneme1"
        content="Toplantı başlatma"
        cardId={1}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      />
      <Cards
        title="deneme2"
        content="Proje planlaması"
        cardId={2}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      />
      <Cards
        title="deneme3"
        content="faslkfasfaifalsnjaifspfjasnogmdjisoin"
        cardId={3}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      />
    </div>
  );
}

export default Main;
