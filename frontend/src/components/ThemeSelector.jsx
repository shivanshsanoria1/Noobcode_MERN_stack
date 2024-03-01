import classes from './css/ThemeSelector.module.css'

function ThemeSelector({ startTheme, setTheme }) {

  const themes = [
    {name: 'a11yDark', displayName: 'A11y Dark'},
    {name: 'atomDark', displayName: 'Atom Dark'}, 
    {name: 'coldarkDark', displayName: 'Coldark Dark'},
    {name: 'dracula', displayName: 'Dracula'}, 
    {name: 'gruvboxDark', displayName: 'Gruvbox Dark'}, 
    {name: 'hopscotch', displayName: 'Hopscotch'}, 
    {name: 'lucario', displayName: 'Lucario'}, 
    {name: 'materialDark', displayName: 'Material Dark'}, 
    {name: 'materialOceanic', displayName: 'Material Oceanic'},
    {name: 'nightOwl', displayName: 'Night Owl'}, 
    {name: 'nord', displayName: 'Nord' },
    {name: 'okaidia', displayName: 'Okaidia'}, 
    {name: 'oneDark', displayName: 'One Dark'},
    {name: 'solarizedDarkAtom', displayName: 'Solarized Dark Atom'},
    {name: 'tomorrow', displayName: 'Tomorrow'},
    {name: 'twilight', displayName: 'Twilight'},
    {name: 'zTouch', displayName: 'Z Touch'}
  ]

  return (<>
    <div className={classes.labelContainer}>
      <label for='selectTheme'> Select a Theme </label>
    </div>

    <div className={classes.selectContainer}>
      <select 
      id='selectTheme'
      name='selectTheme' 
      defaultValue={startTheme} 
      onChange={(e) => setTheme(e.target.value)}
      >
        {
          themes.map((theme) => <option value={theme.name} key={theme.name}>
            {theme.displayName}
          </option>)
        }
      </select>
    </div>
  </>)
}

export default ThemeSelector