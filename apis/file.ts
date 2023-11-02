import type { FileResponse, UpTokenQuery, UpTokenResponse, UpTokenType } from '~/models'
import SparkMD5 from 'spark-md5'

function generateMD5(file: File): Promise<string> {
  const spark = new SparkMD5.ArrayBuffer()
  const fileReader = new FileReader()
  return new Promise((resolve) => {
    fileReader.onload = (e) => {
      spark.append(e.target?.result as ArrayBuffer)
      const md5 = spark.end()
      resolve(md5)
    }
    fileReader.readAsArrayBuffer(file)
  })
}

export async function createFileToken(query: UpTokenQuery) {
  return $fetch<ApiResult<UpTokenResponse>>('/api/video/uptoken', {
    query,
  })
}

export async function uploadFile(file: File, token: string, fileType: UpTokenType) {
  const md5 = await generateMD5(file)
  const formData = new FormData()
  formData.append('file', file)
  formData.append('token', token)
  formData.append('key', `${fileType}/${md5}`)
  return $fetch<FileResponse>('http://up-z2.qiniup.com', {
    method: 'POST',
    body: formData,
  })
}

export function getFileUrl(key: string) {
  return `http://s2i8a2ssf.hn-bkt.clouddn.com/${key}`
}
