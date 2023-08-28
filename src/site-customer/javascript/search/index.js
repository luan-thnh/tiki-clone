window.addEventListener('load', () => {
  const DATA_PRODUCT = JSON.parse(localStorage.getItem('data_product'));
  const HISTORY_SEARCH = JSON.parse(localStorage.getItem('history_search')) || [];

  const searchInput = document.querySelector('.header__search-input');
  const searchResult = document.querySelector('.header__search-result');
  const btnSearch = document.querySelector('.header__search-btn');
  const overlay = document.querySelector('.overlay');

  searchInput.addEventListener('focus', () => {
    searchResult.classList.add('show');
    searchResult.classList.add('show');
    overlay.classList.add('show');
    filterData(searchInput.value);
  });

  searchInput.addEventListener('focusout', (e) => {
    if (!searchResult.contains(e.relatedTarget)) {
      searchResult.classList.remove('show');
      overlay.classList.remove('show');
    }
  });

  const vietnameseChars = [
    'aàáảãạăằắẳẵặâầấẩẫậ',
    'eèéẻẽẹêềếểễệ',
    'iìíỉĩị',
    'oòóỏõọôồốổỗộơờớởỡợ',
    'uùúủũụưừứửữự',
    'yỳýỷỹỵ',
    'dđ',
  ];

  let timeoutId;

  searchInput.addEventListener('input', (e) => {
    clearTimeout(timeoutId);
    isSearching = e.target.value.length > 0;
    const searchTerm = searchInput.value.trim();
    timeoutId = setTimeout(() => filterData(searchTerm), 450);
  });

  function removeVietnameseAccent(str) {
    vietnameseChars.forEach((vietnameseChar, i) => {
      const pattern = new RegExp(`[${vietnameseChar}]`, 'gi');
      str = str.replace(pattern, i.toString());
    });

    return str;
  }

  function filterData(search) {
    search = removeVietnameseAccent(search).toLowerCase();
    const resultProduct = [];
    const resultHistory = [];

    DATA_PRODUCT.forEach(({ name_product }) => {
      const normalized = removeVietnameseAccent(name_product).toLowerCase();

      if (normalized.startsWith(search)) {
        resultProduct.push(name_product.toLowerCase());
      }
    });

    HISTORY_SEARCH.forEach(({ id, value }) => {
      const normalized = removeVietnameseAccent(value).toLowerCase();

      if (normalized.startsWith(search)) {
        resultHistory.push({
          id: id,
          value: value.toLowerCase(),
        });
      }
    });

    let html = '';

    function renderHistorySearch(resultHistory) {
      html += resultHistory
        .reverse()
        .map(
          ({ id, value }) => `
    <a href="#!" class="header__search-history-link" data-history-id="${id}">
      <img src="https://salt.tikicdn.com/ts/upload/90/fa/09/9deed3e3186254637b5ca648f3032665.png" alt="" />
      <span class="header__search-history-text">${value}</span>
      <img src="https://salt.tikicdn.com/ts/upload/5c/a1/7e/cd8cde79e81844f2c394efdc415f5441.png" alt="" class="header__search-history-delete"/>
    </a>
    `
        )
        .join('');
    }

    function renderResultSearch(array) {
      html += array
        .map(
          (nameProduct) => `
        <a href="#!" class="header__search-result-link">
          <img src="https://salt.tikicdn.com/ts/upload/e8/aa/26/42a11360f906c4e769a0ff144d04bfe1.png" alt="" />
          <span class="header__search-result-text">${nameProduct}</span>
        </a>
    `
        )
        .join('');

      searchResult.innerHTML = html;

      handleClickSearchItem();
      handleRemoveHistory();
    }

    if (resultProduct.length === 0) {
      searchResult.innerHTML = `
      <span style="text-align: center; width: 100%; color: #808089">Không tìm thấy kết quả</span>
    `;
      return;
    }

    renderHistorySearch(resultHistory);

    if (resultProduct.length >= 10) {
      renderResultSearch(resultProduct.slice(0, 10));
    } else {
      renderHistorySearch(resultHistory);
    }
  }

  function handleAddHistorySearch(valueHistory) {
    const historyExisted = HISTORY_SEARCH.find(({ value }) => value === valueHistory);

    if (historyExisted) return;

    if (searchInput.value.trim()) {
      if (searchInput.value.trim().length > 0) {
        HISTORY_SEARCH.push({
          id: HISTORY_SEARCH.length + 1,
          value: searchInput.value,
        });
      }
    } else {
      HISTORY_SEARCH.push({
        id: HISTORY_SEARCH.length + 1,
        value: valueHistory,
      });
    }

    localStorage.setItem('history_search', JSON.stringify(HISTORY_SEARCH));
  }

  btnSearch.addEventListener('click', handleAddHistorySearch);
  searchInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      handleAddHistorySearch();
    }
  });

  function handleRemoveHistory() {
    const btnRemoves = document.querySelectorAll('.header__search-history-delete');

    btnRemoves.forEach((btnRemove) => {
      btnRemove.addEventListener('click', () => {
        const historyItem = btnRemove.closest('.header__search-history-link');
        const historyId = historyItem.getAttribute('data-history-id');
        const index = HISTORY_SEARCH.findIndex(({ id }) => id === parseInt(historyId));

        if (index === -1) return;

        HISTORY_SEARCH.splice(index, 1);
        localStorage.setItem('history_search', JSON.stringify(HISTORY_SEARCH));

        searchResult.removeChild(historyItem);
      });
    });
  }

  function handleClickSearchItem() {
    const searchResultItems = document.querySelectorAll('.header__search-result-link');

    searchResultItems.forEach((searchResultItem) => {
      searchResultItem.addEventListener('click', () => {
        handleAddHistorySearch(searchResultItem.textContent.trim());
      });
    });
  }
});
