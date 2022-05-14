import axiosInstance from './axiosInstance'

class githubServices {
  getUser(username, page = 1) {
    return axiosInstance.get(`/search/users?q=${username}&page=${page}`)
  }

  getRepoByUsername(username, page = 1, type = 'replace') {
    return axiosInstance.get(`/users/${username}/repos?page=${page}`)
  }

  getReadMeTxt(username, selectedRepo) {
    return axiosInstance.get(
      `/repos/${username}/${selectedRepo}/contents/README.md`,
    )
  }
}

export default new githubServices()
