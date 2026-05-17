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

export enum TypeFilter {
    Mods,
    Sounds,
    WiPs
}

export enum FeedFilter {
    Recent,
    Featured,
    Popular
}

function apiUrl(page: number, typeFilter: TypeFilter, feedFilter: FeedFilter, perPage: number, search?: string) //page, type, filter, perPage, isOldCustom, search
//(int page, TypeFilter type, FeedFilter filter, GameBananaCategory category, GameBananaCategory subcategory, int perPage, bool nsfw, string search)
{
    const ids = ["22962", "21991"]
    const category = {
        Name: "Custom Levels",
        ID: ids[0]
    }
    const subcategory = {ID: undefined}
    
    // Base
    let url = "https://gamebanana.com/apiv6/"
    switch (typeFilter)
    {
        case TypeFilter.Mods:
            url += "Mod/";
            break;
        case TypeFilter.Sounds:
            url += "Sound/";
            break;
        case TypeFilter.WiPs:
            category.ID = "1928";
            url += "Wip/";
            break;
    }

    // Different starting endpoint if requesting all mods instead of specific category
    if (search != undefined)
        if (!isNaN(Number(search)))
            url += search + "?"
        else
            url += "ByName?_sName=*" + search + "*&_idGameRow=7692&";
    else if (category.ID != undefined)
        url += "ByCategory?";
    else
        url += "ByGame?_aGameRowIds[]=7692&";
    // Consistent args
    url += "_csvProperties=_idRow,_sName,_sModelName,_sProfileUrl,_aSubmitter,_tsDateUpdated,_tsDateAdded,_aPreviewMedia,_sText,_sDescription,_aCategory,_aRootCategory,_aGame,_nViewCount," +
        "_nLikeCount,_nDownloadCount,_aFiles,_aModManagerIntegrations,_bIsNsfw,_aAlternateFileSources&_nPerpage=" + perPage;
    //if (!nsfw)
    url += "&_aArgs[]=_sbIsNsfw = false";
    // Sorting filter
    switch (feedFilter)
    {
        case FeedFilter.Recent:
            url += "&_sOrderBy=_tsDateUpdated,DESC";
            break;
        case FeedFilter.Featured:
            url += "&_aArgs[]=_sbWasFeatured = true& _sOrderBy=_tsDateAdded,DESC";
            break;
        case FeedFilter.Popular:
            url += "&_sOrderBy=_nDownloadCount,DESC";
            break;
    }
    // Choose subcategory or category
    if (subcategory.ID != undefined)
        url += "&_aCategoryRowIds[]=" + subcategory.ID;
    else if (category.ID != undefined)
        url += "&_aCategoryRowIds[]=" + category.ID;
    
    // Get page number
    url += "&_nPage=" + page;
    
    //get_string("", url)
    return url;
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
    _nFileSize: number,
    _sDownloadUrl: string
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
    _aSubmitter: ModOwnerResponse,
    _aFiles: ModFileResponse[]
}

function parseMod(modRes: ModResponse) {
    let preview = "https://pngmagic.com/webp_images/youtube-thumbnail-size-with-aspect-ratio-169_KVG.webp"
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
        fileSize: file._nFileSize,
        file: file._sDownloadUrl,
        tags: [],
        user: {
            id: modRes._aSubmitter._idRow,
            name: modRes._aSubmitter._sName,
            pfp: modRes._aSubmitter._sAvatarUrl
        }
    }

    return result
}

export async function requestMods(page: number, feedFilter: FeedFilter, searchName?: string) {
    const url = apiUrl(page, TypeFilter.Mods, feedFilter, 10, searchName)
    const response: AxiosResponse<ModResponse[]> = await axios.get(url)

    const mods = response.data.map(parseMod)

    return mods
}

export async function requestMod(id: number) {
    const url = apiUrl(0, TypeFilter.Mods, FeedFilter.Recent, 1, String(id))
    console.log(url)
    const response: AxiosResponse<ModResponse> = await axios.get(url)

    

    return parseMod(response.data)
}