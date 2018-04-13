# Useful Vim Settings
## Plugins
__Ctrl + p Plugin__
- VIM 을 켜고 Ctrl + p 를 누르면, 현재 경로를 기준으로 하위에 있는 파일들을 불러옴
- Ctrl + p 로 파일 리스트 창을 연 상태에서, Ctrl + o 를 누르면, [t]ab / [v]ertical / [h]orizontal / [r]eplace/ h[i]dden 모드로 파일을 열 수 있음
  - 본인은 v 와 h 밖에 안씀..
  - Ctrl + w + w 또는 Ctrl + w + 화살표 로 창을 왔다갔다 할 수 있음

## 내 세팅 (.vimrc)
- https://wonism.github.io/vim-for-fe-dev/ 참고

```
"" !!Deprecated

""
"" Janus setup
""

" Define paths
if has('win32') || has('win64') || has('win32unix')
  let g:janus_path = escape(expand("~/.vim/janus/vim"), ' ')
  let g:janus_vim_path = escape(expand("~/.vim/janus/vim"), ' ')
else
  let g:janus_path = escape(fnamemodify(resolve(expand("<sfile>:p")), ":h"), ' ')
  let g:janus_vim_path = escape(fnamemodify(resolve(expand("<sfile>:p" . "vim")), ":h"), ' ')
endif
let g:janus_custom_path = expand("~/.janus")

" Source janus's core
exe 'source ' . g:janus_vim_path . '/core/before/plugin/janus.vim'

" You should note that groups will be processed by Pathogen in reverse
" order they were added.
call janus#add_group("tools")
call janus#add_group("langs")
call janus#add_group("colors")

""
"" Customisations
""

if filereadable(expand("~/.vimrc.before"))
  source ~/.vimrc.before
endif


" Disable plugins prior to loading pathogen
exe 'source ' . g:janus_vim_path . '/core/plugins.vim'

""
"" Pathogen setup
""

" Load all groups, custom dir, and janus core
call janus#load_pathogen()

" .vimrc.after is loaded after the plugins have loaded
```
