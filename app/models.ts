import axios, { AxiosResponse } from "axios"

export type User = {
    id: number,
    name: string,
    pfp: string
}

export type Mod = {
    id: number,
    title: string,
    description: string,
    downloads: number,
    views: number,
    likes: number,
    dislikes: number,
    preview: string,
    updatedAt: number,
    fileSize: number,
    tags: string[],
    user: User,
    file: string,
}

export type Game = {
    id: number,
    name: string,
    icon: string,
    preview: string,
    modCount: number,
}

export enum FeedFilter {
    Recent,
    Featured,
    Popular
}

function apiModsUrl(gameID: number, page: number, feedFilter: FeedFilter, perPage: number, search?: string)
{
    let url = "https://gamebanana.com/apiv6/Mod/"

    if (search != undefined)
        if (!isNaN(Number(search)))
            url += search + "?"
        else
            url += `ByName?_sName=*${search}*&_idGameRow=${gameID}&`;
    else
        url += `ByGame?_aGameRowIds[]=${gameID}&`;

    url += "_csvProperties=_idRow,_sName,_aSubmitter,_tsDateUpdated,_tsDateAdded,_aPreviewMedia,_sText,_sDescription,_aCategory,_aRootCategory,_aGame,_nViewCount," +
        "_nLikeCount,_nDownloadCount,_aFiles,_bIsNsfw&_nPerpage=" + perPage;

    url += "&_aArgs[]=_sbIsNsfw = false";

    url += {
        [FeedFilter.Recent]: "&_sOrderBy=_tsDateUpdated,DESC",
        [FeedFilter.Featured]: "&_aArgs[]=_sbWasFeatured = true& _sOrderBy=_tsDateAdded,DESC",
        [FeedFilter.Popular]: "&_sOrderBy=_nDownloadCount,DESC"

    }[feedFilter]
    
    url += "&_nPage=" + page;
    
    return url;
}

function apiModUrl(modID: number) {
    return apiModsUrl(0, 0, FeedFilter.Recent, 1, String(modID))
}

function apiGamesUrl() {
    return "https://gamebanana.com/apiv12/Util/Homepage/TopGames"
}

type ModOwnerResponse = {
    _sName: string,
    _sAvatarUrl: string,
    _idRow: number
}

type ModMediaResponse = {
    _sBaseUrl: string,
    _sFile: string
}

type ModFileResponse = {
    _nFilesize: number,
    _sDownloadUrl: string
}

type ModCategoryResponse = {
    _sName: string
}

type ModResponse = {
    _idRow: number,
    _tsDateUpdated: number,
    _sName: string,
    _aPreviewMedia: ModMediaResponse[]
    _nDownloadCount: number,
    _sText: string,
    _nViewCount: number,
    _nLikeCount: number,
    _aCategory: ModCategoryResponse,
    _aRootCategory: ModCategoryResponse,
    _aSubmitter: ModOwnerResponse,
    _aFiles: ModFileResponse[]
}

type GameModCountResponse = {
    Mod: number
}

type GameResponse = {
    _idRow: number,
    _sName: string,
    _sIconUrl: string,
    _sBannerUrl: string,
    _aModCounts: GameModCountResponse
}

export const previewPlaceholder = "https://pngmagic.com/webp_images/youtube-thumbnail-size-with-aspect-ratio-169_KVG.webp"
export const iconPlaceholder = "https://cdn-icons-png.flaticon.com/512/8293/8293566.png"

function parseMod(modRes: ModResponse) {
    let preview = previewPlaceholder
    if (modRes._aPreviewMedia.length > 0) {
        const prevObj = modRes._aPreviewMedia[0]
        preview = `${prevObj._sBaseUrl}/${prevObj._sFile}`
    }

    const file = modRes._aFiles[0]
    const result: Mod = {
        id: modRes._idRow,
        title: modRes._sName,
        description: modRes._sText,
        downloads: modRes._nDownloadCount,
        views: modRes._nViewCount,
        likes: modRes._nLikeCount,
        dislikes: Math.floor(modRes._nLikeCount / 8),
        preview,
        updatedAt: modRes._tsDateUpdated,
        fileSize: file._nFilesize,
        file: file._sDownloadUrl,
        tags: [modRes._aCategory._sName, modRes._aRootCategory._sName],
        user: {
            id: modRes._aSubmitter._idRow,
            name: modRes._aSubmitter._sName,
            pfp: modRes._aSubmitter._sAvatarUrl
        }
    }

    return result
}

function parseGame(gameRes: GameResponse) {
    const result: Game = {
        id: gameRes._idRow,
        name: gameRes._sName,
        preview: gameRes._sBannerUrl,
        icon: gameRes._sIconUrl,
        modCount: (gameRes._aModCounts?.Mod || 0)
    }

    return result
}

export async function requestMods(game: Game, page: number, feedFilter: FeedFilter, searchName?: string) {
    const url = apiModsUrl(game.id, page, feedFilter, 12, searchName)
    const response: AxiosResponse<ModResponse[]> = await axios.get(url)

    const mods = response.data.map(parseMod)

    return mods
}

export async function requestMod(id: number) {
    const url = apiModUrl(id)
    const response: AxiosResponse<ModResponse> = await axios.get(url)

    return parseMod(response.data)
}

export async function requestGames() {
    const url = apiGamesUrl()
    const response: AxiosResponse<{Trending: GameResponse[]}> = await axios.get(url)

    const games = response.data.Trending.map(parseGame)
    return games
}