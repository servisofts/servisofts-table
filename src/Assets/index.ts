import { Platform } from 'react-native';

import filter, { ReactComponent as filterW } from './svg/filter.svg';
import arrowDown, { ReactComponent as arrowDownW } from './svg/arrowDown.svg';
import search, { ReactComponent as searchW } from './svg/search.svg';
import sort, { ReactComponent as sortW } from './svg/sort.svg';
import check, { ReactComponent as checkW } from './svg/check.svg';
import arrow, { ReactComponent as arrowW } from './svg/arrow.svg';
import reload, { ReactComponent as reloadW } from './svg/reload.svg';
import list, { ReactComponent as listW } from './svg/list.svg';
import downloadTable, { ReactComponent as downloadTableW } from './svg/downloadTable.svg';
const Assets = {
    Filter: Platform.select({ native: filter, web: filterW }),
    ArrowDown: Platform.select({ native: arrowDown, web: arrowDownW }),
    Search: Platform.select({ native: search, web: searchW }),
    Sort: Platform.select({ native: sort, web: sortW }),
    Check: Platform.select({ native: check, web: checkW }),
    Arrow: Platform.select({ native: arrow, web: arrowW }),
    Reload: Platform.select({ native: reload, web: reloadW }),
    List: Platform.select({ native: list, web: listW }),
    DownloadTable: Platform.select({ native: downloadTable, web: downloadTableW }),
};

export default Assets;