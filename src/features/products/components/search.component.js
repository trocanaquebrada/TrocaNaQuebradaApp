import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Searchbar } from "react-native-paper";
import { View } from "react-native";

import { LocationContext } from "../../../resources/location/location.context";

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
`;

export const Search = () => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);
  return (
    <SearchContainer>
      <Searchbar
        placeholder="O que vc quer trocar hoje?"
        value={searchKeyword}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};
